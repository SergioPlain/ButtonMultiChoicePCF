/* eslint-disable no-unused-vars */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import {AvailableOption,MultiButtonChoiceProps,MultiButtonChoice} from "./components/MultiButtonChoice"
import * as React from "react";

export class ButtonMultiChoice implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    /*private mockData:AvailableOption[] = [
        {label: "Opción 1", value:1},
        {label: "Opción 2", value:2},
        {label: "Opción 3", value:3},
        {label: "Opción 4", value:4},
    ]*/

    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private _notifyOutputChanged: () => void;
    private _selectedItems: number[];
    private _availableOptions: AvailableOption[] = [];
    private _props: MultiButtonChoiceProps;

    private handleOptionsChange(selectedOptions: number[]) {
        this._selectedItems = selectedOptions;
        this._notifyOutputChanged();
    }


    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this._notifyOutputChanged = notifyOutputChanged;
        // Store values currently selected in the field
        this. _selectedItems = context.parameters.selectedItems.raw || [];

        // Create a select option for each option specified by the target OptionSet and add it to array
        (context.parameters.selectedItems as ComponentFramework.PropertyTypes.MultiSelectOptionSetProperty).attributes?.Options.forEach(option => {
            const availableOption:AvailableOption = {
                label: option.Label,
                value: option.Value
            };
            this._availableOptions.push(availableOption)
        });

        /*this._availableOptions = this.mockData;
        this._selectedItems = [1,2];*/
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

        this._props ={
            availableOptions: this._availableOptions,
            selectedOptions: this._selectedItems,
            handleChange: this.handleOptionsChange.bind(this)
        }
        return React.createElement(
            MultiButtonChoice, this._props
        );

        
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { selectedItems: this._selectedItems};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
