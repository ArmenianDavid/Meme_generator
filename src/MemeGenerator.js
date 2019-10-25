import React from 'react'


class MemeGenerator extends React.Component{
  constructor(){
    super();
    this.state={
        topText : '',
        bottomText : '',
        randomImage : 'http://i.imgflip.com/1bij.jpg',
        allMemeImgs : [],
        loading : false,
    }
    this.handleChange =this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
     this.setState({
       loading : true,
     })
       
    fetch('https://api.imgflip.com/get_memes')
      .then( response => response.json()).then(data => data.data).then( mems =>{
        console.log(mems.memes)
        return this.setState({
            allMemeImgs : mems.memes,
        })
      
      })
        
        

      this.setState({
        loading : false,
      })
      
  }

  handleChange(event){
      this.setState({
        [event.target.name] : event.target.value,
      })
  }

  handleSubmit(event) {
       event.preventDefault()
       const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
       const randomMemeImg = this.state.allMemeImgs[randNum].url
       this.setState({
           randomImage : randomMemeImg,
       })
       console.log(randNum)
  }

  render(){
    return(
      <div>
          <form className='meme-form' onSubmit={this.handleSubmit}>
             <input 
                type='text' 
                name='topText'
                placeholder='topText' 
                onChange={this.handleChange}
                value={this.state.topText} 
                 />
             <input 
                type='text' 
                name='bottomText'
                placeholder='bottomText' 
                onChange={this.handleChange}
                value={this.state.bottomText}
                 />

            <button>Gen</button>
          </form>
          <div className='meme'>
              <img src={this.state.randomImage} alt='' />
              <h2 className='top'>{this.state.topText}</h2>
              <h2 className='bottom'>{this.state.bottomText}</h2>
           </div>
      </div>
    )
  }
}

export default MemeGenerator