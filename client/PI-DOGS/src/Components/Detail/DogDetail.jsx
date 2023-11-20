// import axios from "axios";
// import React, { Fragment, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteDetails, getDetails } from "../../Redux/Actions/index";
// import styles from "../Detail/DogDetail.module.css";
// import bone from "../../assets/bone.svg";
// import dog from "../../assets/dog.png"

// const DogDetail = (props) => {
//   const dispatch = useDispatch();
//   const [imagen, setImagen] = useState(null);

//   useEffect(() => {
//     const { match } = props;
//     const id = match?.params?.id;

//     const fetchDogDetails = async (id) => {
//       try {
//         if (id) {
//           const url = `https://api.thedogapi.com/v1/images/${id}`;
//           const imageUrl = await imagenes(id);
//           setImagen(imageUrl || url); // Use imageUrl if available, otherwise fallback to the original URL
//           dispatch(getDetails(id));
//         }
//       } catch (error) {
//         console.error("Error fetching dog details:", error);
//       }
//     };
    
//     const imagenes = async (id) => {
//       try {
//         const { data } = await axios.get(`https://api.thedogapi.com/v1/images/${id}`);
//         console.log('Image Data:', data);
//         return data.url;
//       } catch (error) {
//         console.error("Error fetching dog image:", error);
//       }
//     };
    
    
    

//     fetchDogDetails(id);

//     return () => dispatch(deleteDetails());
//   }, [dispatch, props.match]);

//   const imagenes = async (id) => {
//     try {
//       const { data } = await axios.get(`https://api.thedogapi.com/v1/images/${id}`);
//       console.log(data);
//       return data.url;
//     } catch (error) {
//       console.error("Error fetching dog image:", error);
//       // You might want to return a default image URL or handle the error accordingly.
//     }
//   };

//   const myDog = useSelector((state) => state.details);

//   if (!myDog) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <Fragment>
//       <div className={styles.bodix}>
//         <div className={styles.mainContainer}>
//           <h2 className={styles.mainTitle}>{myDog.name}</h2>
//           <img src={myDog.image} alt={myDog.name} className={styles.image} />
//           <div className={styles.detailsContainer}>
//             {myDog.breed_group && (
//               <div className={styles.breed_group}>
//                 <div className={styles.imageSection}>
//                 <div className={styles.imageSection}>
//                     <img
//                       src={dog}
//                       alt="dog"
//                       className={styles.detailsSVG}
//                     />
//                   </div>
//                 </div>
//                 <div className={styles.infoSection}>
//                   <h3>Breed group: </h3>
//                   <p>{myDog.breed_group}</p>
//                 </div>
//               </div>
//             )}

// <div className={styles.life_span}>
//               <div className={styles.imageSection}></div>
//               <div className={styles.infoSection}>
//                 <h3>Life span: </h3>
//                 <p>{myDog.life_span}</p>
//               </div>
//             </div>

//             <div className={styles.weights}>
//   <div className={styles.imageSection}></div>
//   <div className={styles.infoSection}>
//     <h3>Weight: </h3>
//     <p>Min: {myDog.weight_min}</p>
//     <p>Max: {myDog.weight_max}</p>
//   </div>
// </div>


//             <div className={styles.heights}>
//               <div className={styles.imageSection}>
//                 <img
//                   src={bone}
//                   alt="a tiny svg bone"
//                   className={styles.detailsSVG}
//                 />
//               </div>
//               <div className={styles.infoSection}>
//                 <h3>Height: </h3>
//                 <p>Min: {myDog.height_min}</p>
//                 <p>Max: {myDog.height_max}</p>
//               </div>
//             </div>

//             <br />

//             <div className={styles.temperament}>
//               <div className={styles.infoSection}>
//                 <div>
//                   <h3>Temperament: </h3>
//                   <p>
//                     {myDog.createdInDB
//                       ? myDog.temperaments.map((el) => el.name).join(", ")
//                       : myDog.temperament}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Link to="/home">
//             <button className={styles.button}>Back</button>
//           </Link>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default DogDetail;


import { useParams, Link } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import styles from "../Detail/DogDetail.module.css"
import { useSelector } from "react-redux";
import bone from "../../assets/bone.svg";

function DogDetail() {
    const temperaments = useSelector((state) => state.temperaments);
    const [dogDetail, setDogDetail] = useState({name: "", temperament: "", peso: "", años: "", altura: "", fotoid: ""})
    let {id} = useParams()

    useEffect(() => {
        traerDetalles()
    }, [])

    const traerDetalles = () => {
        axios.get(`http://localhost:3001/dogs/${id}`) 
            .then((res) => {
                console.log(res)
                setDogDetail({
                    name: res.data.name,
                    temperament: res.data.temperament || res.data.temperamento,
                    altura: res.data.height?.metric || res.data.altura,
                    peso: res.data.weight?.metric ||res.data.peso,
                    años: res.data.life_span || res.data.años,
                    fotoid: res.data.image?.url
                })
            })
            .catch((error) => {
                console.log(error);
            }); 
    } 

    return (
        <div className= "bodix">
            <div className= "mainContainer">
            <h2 className={styles.mainTitle}>{dogDetail.name}</h2>
                <div className= "container-img">
                    <img className= "img-perro" src= {dogDetail.fotoid}></img>
                </div>
                <div className={styles.detailsContainer}>
                <div className="descripcion-perro">
                     <div className={styles.life_span}>
               <div className={styles.imageSection}></div>
               <div className={styles.infoSection}>
                 <h3>Life span: </h3>
                 <p>{dogDetail.life_span}</p>
               </div>
             </div>
             </div>
             <div className={styles.weights}>
   <div className={styles.imageSection}></div>
   <div className={styles.infoSection}>
     <h3>Weight: </h3>
     <p>Min: {dogDetail.peso}</p>
     <p>Max: {dogDetail.peso}</p>
   </div>
 </div>


             <div className={styles.heights}>
               <div className={styles.imageSection}>
                 <img
                   src={bone}
                   alt="a tiny svg bone"
                   className={styles.detailsSVG}
                 />
               </div>
               <div className={styles.infoSection}>
                 <h3>Height: </h3>
                 <p>Min: {dogDetail.height_min}</p>
                 <p>Max: {dogDetail.height_max}</p>
               </div>
             </div>

             <br />

             <div className={styles.temperament}>
               <div className={styles.infoSection}>
                 <div>
                   <h3>Temperament: </h3>
                   <p>
                     {dogDetail.createdInDB
                       ? dogDetail.temperaments.map((el) => el.name).join(", ")
                       : dogDetail.temperament}
                   </p>
                 </div>
               </div>
             </div>
                        <Link to="/home">
             <button className={styles.button}>Back</button>
          </Link>
                </div>
            </div>
        </div>
    )
}

export default DogDetail
