

const inform = document.getElementById('inform')
const content = document.getElementById('content')
const input = document.getElementById('inputbox')
const submitbutton = document.getElementById('submitbutton')
const headform = document.getElementById('headform')
const clearbutton = document.getElementById('clearbutton')
var taskid;
var editid;
var taskvalue;
var editflag =0;


const gettasks = async ()=>{
    try{
        const data = await fetch('http://localhost:27017/api/tasks/findall')
        const tasks = await data.json()
        content.innerHTML =''

        if(tasks.items.length<1){
            inform.innerHTML ='No items in your list'
             setTimeout(()=>{
                inform.innerHTML =''
            },2000)
            
           }
           else{
           
               tasks.items.map((task)=>{
                   const element = document.createElement('DIV')
                   element.classList.add('contentitems')
                   element.setAttribute('taskid',`${task._id}`)
                   taskid = task._id
                   taskvalue = task.value
                   const para = document.createElement('P')
                   para.classList.add('contentvalue')
                   para.innerHTML=`${task.value}`
                   const div = document.createElement('DIV')
                   div.classList.add('contenticons')
                
                   const btn1 = document.createElement('BUTTON')
                   btn1.classList.add('editbutton')
                   btn1.addEventListener('click',()=>{
                       edit(task._id)
                   })
                   btn1.innerHTML=`<i class="fa fa-edit"></i>`
                   const btn2= document.createElement('BUTTON')
                   btn2.classList.add('deletebutton')
                   btn2.addEventListener('click',()=>{
                       remove(task._id)
                   })
                   btn2.innerHTML=`<i class="fa fa-trash"></i>`

                   div.append(btn1,btn2)
                   element.append(para,div)
        
            
                   content.appendChild(element)
               })
           }
          
    }
    catch(err){
        inform.innerHTML ='There was some error'
         setTimeout(()=>{
            inform.innerHTML =''
        },2000)
       
    }
  
    
}
gettasks();

const edit = async (taskid)=>{
    submitbutton.innerHTML = "Edit";
    editid = taskid
   input.value = taskvalue
   editflag =1;
}

const remove = async (taskid)=>{
    try{
  
     const removed = await axios.delete(`http://localhost:27017/api/tasks/remove/${taskid}`)
     inform.innerHTML ='Task was deleted successfully'
       setTimeout(()=>{
         inform.innerHTML =''
     },2000)
 }
 catch(err){
     inform.innerHTML ='There was error, please try again'
    setTimeout(()=>{
         inform.innerHTML =''
     },2000)
     
 }
 gettasks();
 }
 

const create = async ()=>{
    if(editflag===0){
        try{
            const value = input.value;
         
            const created = await axios.post('http://localhost:27017/api/tasks/create',{value:value})
            inform.innerHTML ='Task was added successfully'
              setTimeout(()=>{
                inform.innerHTML =''
            },2000)
    
            gettasks();
        }
        catch(err){
            inform.innerHTML ='There was error, please try again'
           setTimeout(()=>{
                inform.innerHTML =''
            },2000)
            
        }
    
    }
    else{
        try{
            const value = input.value;
         
            const created = await axios.patch(`http://localhost:27017/api/tasks/update/${editid}`,{value:value})
            inform.innerHTML ='Task was edited successfully'
              setTimeout(()=>{
                inform.innerHTML =''
            },2000)
    
            gettasks();
        }
        catch(err){
            inform.innerHTML ='There was error, please try again'
           setTimeout(()=>{
                inform.innerHTML =''
            },2000)
            
        }
        submitbutton.innerHTML = "Submit";
    }
       input.value = '';
       editflag =0;
       gettasks();
   
}


const clearall = clearbutton.addEventListener('click', async ()=>{
    try{
        const deleteall = await axios.delete('http://localhost:27017/api/tasks/removeall')
        content.innerHTML =''
        inform.innerHTML ='All items cleared in your list'
        setTimeout(function(){
            inform.innerHTML = ''
            console.log('settimeout')
        },2000)
        
       
        gettasks();  
    }
    catch(err){
        inform.innerHTML ='There was error in clearing'
        setTimeout(()=>{
            inform.innerHTML =''
        },2000)
  
       
        
    }
})

headform.addEventListener('submit',(e)=>{
    create();
    e.preventDefault();

})






