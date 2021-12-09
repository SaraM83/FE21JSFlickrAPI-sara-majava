

const myKey = 'a708311d89f5e9313eca5a346b380b7a';
const btn = document.querySelector('button');


btn.addEventListener( 'click', 
    function(){
        const userInput = document.querySelector('#search');
        const pagesInput = document.getElementById('list'); 
        const numPages = pagesInput.value; 

        searchPic(userInput.value, numPages);
        const par = document.getElementById('p'); 
        par.innerText = 'Searching...';
        anime({
            targets: '#p',
            translateX: 250,
            scale: 2,
            rotate: '1turn'
        });
    }
);


function searchPic(pic, page){
    const url = `https://www.flickr.com/services/rest/?api_key=${myKey}&method=flickr.photos.search&text=${pic}&format=json&nojsoncallback=3&per_page=${page}&page=4`; 

    fetch(url).then(
        function(response){
            if (response.status >= 200 && response.status < 300) {
                removePar(); 
                return response.json();
            } else { 
                throw 'Something went wrong';  
            }
        }
        

    ).then(
        function(data){
            let picsArray = data; 
            const photoArray = picsArray.photos.photo; 
            getImageUrl(photoArray);   
        }
    ).catch(
        function(error) {
            console.log(error); 
            failMessage(error); 
            removePar(); 
        }
    )
}

function getImageUrl(object){ 
    for(let i = 0; i < object.length; i++) {
        let photo = object[i]; 

        const btn1 = document.getElementById('small');
        const btn2 = document.getElementById('medium');

        if (btn1.checked === true) {
            size = btn1.value; 
        } else if (btn2.checked === true) {
            size = btn2.value; 
        }

        let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
        console.log(imgUrl);
        displayImg(imgUrl); 
    }

}
 
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;

    const div = document.querySelector('div'); 
    div.appendChild(img);
    img.style.margin = '10px'; 

}

function removePar() {
    const remP = document.getElementById('p');
    remP.innerText = ''; 
}

function failMessage() {
    const failMessage = document.createElement('p');
    document.body.appendChild(failMessage);
    failMessage.setAttribute('id', 'failPar');
    failMessage.innerText = 'Something went wrong, try again!';
    failMessage.style.fontSize = '24px'; 
    failMessage.style.textAlign = 'center'; 
    failMessage.style.color = 'red'; 
    anime({
        targets: '#failPar',
        translateX: 100,
        direction: 'alternate',
        loop: true,
        easing: 'spring(1, 80, 10, 0)'
    })
}