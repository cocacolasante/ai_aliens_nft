import "../App.css"

import img3 from "./3.png"
import img17 from "./17.png"
import img23 from "./23.png"

function NftCards() {
  return (
    <div className='nft-container-grid'>
        <div className='nft-card-container'>
            <div className='nft-img-container'>
                <img className='nft-img' src={img3} />
                <h2 className='gradient-text'>Alien 1</h2>
            </div>
        </div>
        
        <div className='nft-card-container'>
            <div className='nft-img-container'>
                <img className='nft-img' src={img17} />
                <h2 className='gradient-text'>Alien 1</h2>
            </div>
        </div>
        
        <div className='nft-card-container'>
            <div className='nft-img-container'>
                <img className='nft-img' src={img23} />
                <h2 className='gradient-text'>Alien 1</h2>
            </div>
        </div>
        
    </div>
  );
}

export default NftCards;