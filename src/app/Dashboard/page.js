'use client'
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore,} from "../firebase";
import { collection, getDocs, query, doc, setDoc, deleteDoc, getDoc, count } from "firebase/firestore";
import React, { useEffect, useState } from "react";





export default function Pantry() {
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'green',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  };
  



  const [pantry, setPantry] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('')
  console.log(itemName)
  

    const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
        pantryList.push({ name: doc.id, ...doc.data() })
    })
    console.log(pantryList)
    setPantry(pantryList)
   }

  useEffect( () => {
   
   updatePantry()
  }, [])

    const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      await setDoc(docRef, { count: count + 1 })
    } else {
      await setDoc(docRef, { count: 1 })
    }
    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { count } = docSnap.data()
    if (count === 1) {
      await deleteDoc(docRef)
    } else {
      await setDoc(docRef, { count: count - 1 })
    }
  }
  await updatePantry()
  }

   const removeAll = async (item) => {
     const docRef = doc(collection(firestore, 'pantry'), item)
     await deleteDoc(docRef)
     updatePantry()
   }

    
  return (

    <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    gap={2}
    >
           <TextField
            id="search"
            label="Search"
            variant='outlined'
            sx={{ width: '80%' }}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Search..."
          />
      
       <Typography variant="h2" style={{ marginTop: '-20px' }}>Pantry Manager</Typography>

       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add in Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
          <TextField
            id="outlined-basic" 
            label="Item" 
            variant="outlined" 
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}/>
          <Button variant="outlined" onClick={() => {
             addItem(itemName)
             setItemName('')
             handleClose()
          }}
            >Add </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>
      Add</Button>
      <Box border={'1px solid #333'}>
  
      <Box 
      width="800px" 
      height="100px" 
      bgcolor={'#ADD8E6'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      >
        <Typography variant={'h3'} color={'#333'} textAlign={'center'} >
        Pantry Items
        </Typography>
      </Box>
      <Stack width="800px" height="200px" spacing={2} overflow={'auto'}>
        {pantry.filter((item) => {
          return itemName.toLowerCase() === '' ? item : item.name.toLowerCase().includes(itemName.toLowerCase())
        }).map(({name, count}) => (
          <Box
          key={name}
          width="100%"
          minHeight="150px"
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          bgcolor={'#0000ff'}
          paddingX={5}
          >
          <Typography
          variant={'h3'}
          color={'#333'}
          textAlign={'center'}
          >
          {
            //Captizlie the first letter
            name.charAt(0).toUpperCase() + name.slice(1)
          }
          </Typography>

          <Typography variant={'h3'} color={'#333'} textAlign={'center'} paddingX={5}>
              Quantity: {count}
            </Typography>

          <Button variant="contained" onClick={() => removeItem(name)} gap={2} paddingX={5}>
           Remove Item Quantity
            </Button>

            <Button variant="contained" onClick={() => removeAll(name)} gap={2} paddingX={5}>
           Remove Item 
            </Button>
          </Box>
        ) 
        )}
        </Stack>
        </Box>
        </Box>
  );
}

