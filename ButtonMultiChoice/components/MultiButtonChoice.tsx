/* eslint-disable no-unused-vars */
import * as React from 'react';
import {useState} from 'react';

export interface MultiButtonChoiceProps {
    availableOptions:AvailableOption[],
    selectedOptions: number[],
    handleChange: (selectedOptions:number[])=>void
  }
  
  export interface AvailableOption {
    label: string;
    value: number;
  }


  export const MultiButtonChoice = ({availableOptions, selectedOptions, handleChange}:MultiButtonChoiceProps) => {

    const [selectedItems, setSelectedItems] = useState(selectedOptions);

        const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        e.defaultPrevented;
        let newSelectedItems = selectedItems;
        if(e.target.checked){
                newSelectedItems.push(parseInt(e.target.value))
            } else {
                newSelectedItems.splice(newSelectedItems.indexOf(parseInt(e.target.value)),1)
        }
        setSelectedItems(newSelectedItems);
        handleChange(selectedItems);
    }

    return(
        <div className='multiselect-container'>
            <ul className='ks-cboxtags'>
                {availableOptions.map(option => (
                    <li key={option.value}>
                        <input 
                            type="checkbox"
                            name={option.label}
                            value={option.value}
                            id={option.label}
                            checked={selectedItems.includes(option.value)}
                            onChange={(e) => onHandleChange(e)}
                                />
                        <label htmlFor={option.label}>{option.label}</label>
                    </li>
                ))}
            </ul>
        </div>)

  }