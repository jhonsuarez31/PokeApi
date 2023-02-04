import { useState } from "react";

export const useForm = (initialForm ={}) =>{

    const [formState, setformState] = useState(initialForm)

    const onInputChangue = ({target}) =>{
        const {name, value} = target
        setformState({
            ...formState,
            [name]:value
        }
        )
    }

    const onResertForm = () =>{
        setformState(initialForm)
    }

    return {
        ...formState,
        formState,
        onInputChangue,
        onResertForm
    }


}