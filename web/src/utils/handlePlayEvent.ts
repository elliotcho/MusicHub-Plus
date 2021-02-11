import { isServer } from './isServer';

export const handlePlayEvent = () => {
    if(!isServer()) {
        document.addEventListener('play', e => {

            const audioList = document.getElementsByTagName('audio');
        
            for(let i=0;i<audioList.length;i++){
               if(audioList[i] !== e.target) {
                  audioList[i].pause(); 
               }
            }
            
        }, true);
    }
}