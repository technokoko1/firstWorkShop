document.getElementById('cars').addEventListener('click',(ev)=>{

    if(ev.target.classList.contains('more')){
       const btn = ev.target
      const desc= ev.target.parentElement.querySelector('.description')
      if(desc.style.display=='block'){
          ev.target.textContent='Show More'
        desc.style.display='none'
      }else{
        ev.target.textContent='Show Less'
        desc.style.display='block'
      }
    }
})