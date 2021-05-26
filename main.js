const container = document.querySelector('.container');

let latestDoc = null;

const getNextGallery = async () => {

    const ref = db.collection('gallery')
        .orderBy('title')
        .startAfter(latestDoc || 0)
        .limit(4);

    const data = await ref.get();

    let template = '';
    data.docs.forEach(doc => {
        const gallery = doc.data();
        template += `
            <div class="card">
                <h2>${gallery.title}<h2>
            </div>
        `
    });

    container.innerHTML += template;

    latestDoc = data.docs[data.docs.length - 1];

    if (data.empty){
        loadMore.removeEventListener('click', handleClick);
    }

}

window.addEventListener('DOMContentLoaded', () => getNextGallery());

const loadMore = document.querySelector('.load-more button');

const handleClick = () => {
    getNextGallery();
}

loadMore.addEventListener('click', handleClick);