import React, { useEffect, useState } from 'react';
import img1 from './images/1.png'
import img2 from './images/2.png'
import img3 from './images/3.png'

const getData = () => {
    let data = localStorage.getItem('lists')
    if (data) {
        return data = JSON.parse(data)
    } else {
        return [];
    }
}
const TodoList = () => {

    const [inpVal, setInpVal] = useState("")
    const [items, setItems] = useState(getData())
    const [toggleIcon, setToggleIcon] = useState(true)
    const [isEdit, setIsEdit] = useState(null)


    const addItem = () => {


        if (!inpVal) {
            alert("erorr note empty")
        } else if (inpVal && !toggleIcon) {
            setItems(

                items.map((elem) => {
                    if (elem.id === isEdit) {
                        return { ...elem, name: inpVal }

                    }
                    return elem;
                })
            )
            setToggleIcon(true)
            setInpVal('')
            setIsEdit(null)

        }
        else {
            const myObj = { id: new Date().getTime().toString(), name: inpVal }
            setItems([...items, myObj])
            setInpVal("")
        }

    }
    // const deleteItem = (id) =>{
    //     const myNewArray= items.filter((elem,index)=>{
    //         return index !== id
    //     })
    //     setItems(myNewArray)

    // }
    const deleteItem = (id) => {
        const myNewArray = items.filter((elem) => {
            return elem.id !== id
        })
        setItems(myNewArray)

    }
    const editItem = (id) => {
        const newEdit = items.find((elem) => {
            return elem.id === id
        })
        console.log(newEdit);
        setInpVal(newEdit.name)
        setToggleIcon(false)
        setIsEdit(id)
    }

    // save data 

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])


    return (
        <>
            <div className="all">
                {/* ///////todo task2 ////////// */}
                <div className='todo-task'>


                    <div className='todoTitle'>
                        <h3>Note List</h3>
                        <img src={img1} className='todoImg' alt="" />
                    </div>
                    <div className='secondTite'>
                        <div>Add your Note Here</div>
                        <img src={img2} className='handPeace' />
                    </div>


                    <div>
                        <img src={img3} className='handWrite' alt="" />
                        <input className='inpVal input' value={inpVal}
                            onChange={(e) => setInpVal(e.target.value)}
                            placeholder='... add note'
                        />
                        {
                            toggleIcon ? <i class="fa-solid fa-plus icon" onClick={addItem}></i>
                                :
                                <i class="fa-regular fa-pen-to-square icon" onClick={addItem}></i>
                        }
                    </div>


                    <div className='showItems'>
                        {
                            items.map((item, index) => {
                                return (
                                    <div className='items'>
                                        <div className='item'>
                                            {item.name}
                                            <div>

                                                <i class="fa-regular fa-pen-to-square editIcon  icon2" onClick={() => editItem(item.id)}></i>
                                                <i class="fa-solid fa-trash-can delIcon  icon2" onClick={() => deleteItem(item.id)}></i>
                                            </div>
                                        </div>


                                    </div>

                                )
                            })
                        }

                    </div>

                </div>

            </div>
        </>
    )

}


export default TodoList