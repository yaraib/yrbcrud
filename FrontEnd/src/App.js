import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  
  const [news, setNews] = useState([]);  
  const [oiage, uiage] = useState();
  const [oiname, uiname] = useState();
  


  var insrt=0,upd=0;  var usn=0;
  var idc=0,idc2=0,flg=0, age2=0, del=0, search=0;

  useEffect(() => {
    if (oiage === '') {
      uiage();
    }
  }, [oiage]);

  useEffect(() => {
    if (oiname === '') {
      uiname();
    }
  }, [oiname]);



  //INSERTION
  function insertion()
  {
    insrt=1;
    search=0;
    upd=0;
    del=0;
    uiage('');
        uiname('');

        if(oiname!='' && oiage!='' && oiname!='undefined' && oiage!='undefined' && oiname!=' ' && oiage!=' ' )
        fetchData();
    
   
  }

  //SEARCH  
  function searchf()
  {
    search=1;
    insrt=0;
    upd=0;
    del=0;
    uiage('');
        uiname('');

        // if(oiname!='' && oiage!='' && oiname!=undefined && oiage!=undefined )
        fetchData();
       
    
   
  }

  
  useEffect(() => {
    fetchData();
  }, []);

 
  //UPDATION
  function myfunc(i,id,age)
  {
    insrt=0;
    search=0;
    upd=1;
    del=0;
    usn=i;
    idc=id;
    age2=age;
    fetchData();
    
  }

  //DELETE
  function mydel(id)
  {
    
    insrt=0;
    search=0;
    del=1;
    upd=0;
    idc=id;


    
    // alert(del);
    // alert(insrt);
    // alert(upd);
    // alert(idc);
    // alert(oiname);
    // alert(oiage);
    
    
    
    
    fetchData();

    // alert(oiage);
    
  }
  
  const fetchData = () => {
    axios
      .get(
        `http://localhost:2002/data/${idc}/${usn}/${age2}/${del}/${insrt}/${oiname}/${oiage}/${upd}/${search}`
        // /${oiage}/${oiname}/${bcv}/${oid}/${oname}/${a}/${insrt}/${upd}/${srch}
      )
      .then((res) => {
        setNews(res.data.userData);
        

        console.log(news);

        

      });
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  // if(oiage=='')
  //  uiage=0;
  //  if(oiname=='')
  //  uiname=0;
   

  return (
    
    <div style={{position:'absolute', width:'100%', height:'100%', background:'white', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>

    <div style={{background:'white'}}>
     
       
<div>
<table border={1} cellPadding={1} cellSpacing={5} style={{marginTop:'30px', background:'silver'}}>

<tr style={{border:'none'}}>
  <th><input


        placeholder="Enter Name"
        type="text"
        name="uiname"
        value={oiname}
        id="uiname"
        onChange={(e) => {
          const alpValue = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Remove numeric characters

          uiname(alpValue);
        }}
      /></th>
      <th><input
     
        placeholder="Enter Age"
        type="text"
        name="uiage"
        id="uiage"
        value={oiage}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

          uiage(numericValue);
        }}
      /></th>
      <th>
      <button onClick={() => {
                  insertion();
                  
                }} style={{background:'green', color:'white', width:'100%', height:'100%'}}>Insert</button>
             
             
             
              <button onClick={() => {
                  searchf();
                  
                }} style={{background:'indigo', color:'white', width:'100%', height:'100%'}}>Search</button>
      </th>
</tr>
 
    <tr style={{background:'gray'}}>
      
      <th>Name</th>
      <th>Age</th>
      <th>Actions</th>
    </tr>
  
   
      {news.map((data,index) => (




       
       
  
    <tr key={index}>
      <td><input
            type="text"
            value={data.fname}
            onChange={(e) => {
              const alpValue = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Remove numeric characters

              
              data.fname = alpValue;
              
              setNews([...news]);
            }
             
            }
          /></td>
      <td><input
            type="text"
            value={data.age}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

              
              data.age = numericValue;
              setNews([...news]);
            }
             
            }
          /></td>
      <td><button onClick={()=>{
            myfunc(data.fname,data.id,data.age);
            
          }} style={{marginRight:'10px', background:'blue', color:'white'}}>Edit</button>

          <button onClick={()=>{
            mydel(data.id);
            
          }} style={{background:'red', color:'white'}}>Delete</button>
          
          </td>
          
           {/* <td></td> */}
    </tr>
  

          
          
          
          
          
          
          
        
      ))}
</table>
</div>
         </div>
         </div>
  );
}
