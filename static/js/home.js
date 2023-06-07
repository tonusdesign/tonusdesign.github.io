//Kép keverő
class ImgShuffler {
    constructor(arrContainers, arrContents, strShuffleType, intSecShuffleInterval, intMsTransitionTime){
        this.containers = arrContainers;
        if(arrContents){
            this.contents = arrContents;
        } else {
            this.contents = [];
            this.containers.forEach(container => {
                this.contents.push(container.src)
            })
        }
        if(strShuffleType=='pair'){
            this.shuffleFunction = this.shuffle
        } else if(strShuffleType=='pool') {
            this.shuffleFunction = this.shufflePool
        } else if(strShuffleType=='all') {
            this.shuffleFunction = this.shuffleAll
        }
        /*this.shuffleFunction = (strShuffleType ? 
            ((strShuffleType == 'all') ?
                this.shuffleAll : this.shuffle
            ) : this.shuffleAll
        )*/

        this.interval = 1000*parseInt(intSecShuffleInterval ? intSecShuffleInterval : 3);
        this.transitionTime = parseInt(intMsTransitionTime ? intMsTransitionTime : 200);
        this.timer = setInterval(() => {
            //Opacity classes
            /*this.containers.forEach(container => {
                container.classList.remove('fade-in');
                container.classList.add('fade-out');
            })*/
            setTimeout(() => {
                //Shuffle
                this.shuffleFunction();
                //Opacity classes
                /*this.containers.forEach(container => {
                    container.classList.add('fade-in');
                    container.classList.remove('fade-out');
                })*/
            }, intMsTransitionTime);
            
        }, this.interval);
    }

    shuffle(){
        //Get two random images from the pool
        let img_1 = this.containers[parseInt(Math.random() * this.containers.length)];
        let img_2 = this.containers[parseInt(Math.random() * this.containers.length)];
        
        //Swap the sources
        let temp = img_1.src;
        img_1.src = img_2.src;
        img_2.src = temp;
    }

    shufflePool(){
        let img = this.containers[parseInt(Math.random() * this.containers.length)];
        let arrSrcInUse  = []
        this.containers.forEach(container => {
            arrSrcInUse.push(container.src)
        })
        let src = this.contents[parseInt(Math.random() * this.contents.length)];
        if (!arrSrcInUse.includes(src)){
            img.src = src;
        }
    }

    shuffleAll(){
        //TODO: Not only every image but pair-by-pair, swap images for originals ans add sepia in css
        //Copy arrays
        let unassignedContents = this.contents.slice();
        //For each container set random element
        this.containers.forEach(container => {
            let i = Math.max(
                0,
                parseInt(Math.random() * (unassignedContents.length))
            );
            container.src = unassignedContents[i];
            unassignedContents.splice(i, 1);
        })
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    //Vanta hullám háttér betöltése
    VANTA.WAVES({
        el: "#wave_bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        shininess: 42.00,
        waveHeight: 40.00,
        waveSpeed: 1.05,
        zoom: 0.88
    })

    //Könyvek keverése
    bookShuffler = new ImgShuffler(
        [
            document.getElementById('book1'),
            document.getElementById('book2'),
            document.getElementById('book3'),
            document.getElementById('book4'),
            document.getElementById('book5'),
            document.getElementById('book6'),
            document.getElementById('book7'),
            document.getElementById('book8')
        ],
        undefined,
        'pair',
        1,
        200
    )

    //IMBI képeinek keverése
    imbiShuffler = new ImgShuffler(
        [
            document.getElementById('imbi1'),
            document.getElementById('imbi2'),
            document.getElementById('imbi3'),
        ],
        undefined,
        'pair',
        1,
        200
    )

})

