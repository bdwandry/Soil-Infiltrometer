import React, { Component } from 'react'
import '../CSS-Files/table.css'

class Table extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            //     students: [
            //         { id: 1, Time: 'Wasif', Volume: 21},
            //         { id: 2, Time: 'Ali', Volume: 19},
            //         { id: 3, Time: 'Saad', Volume: 16},
            //         { id: 4, Time: 'Asad', Volume: 25}
            //     ]
            // }
            students: this.props.Data
        }
    }

    renderTableData() {

        return this.state.students.map((student, index) => {
            const { id, Time, Sqrt ,Volume, Infilt} = student //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{Time}</td>
                    <td>{Sqrt.toFixed(2)}</td>
                    <td>{Volume}</td>
                    <td>{Infilt.toFixed(1)}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
            console.log(key.toUpperCase())
            if (key.toUpperCase() === "ID") {
                return <th key={index}>{key.toUpperCase()}</th>
            }
            if (key.toUpperCase() === "TIME") {
                return <th key={index}>{key.toUpperCase() + " (s)"}</th>
            }

            if (key.toUpperCase() === "SQRT") {
                return <th key={index}>{key.toUpperCase() + " (s)"}</th>
            }

            if (key.toUpperCase() === "VOLUME") {
                return <th key={index}>{key.toUpperCase() + " (mL)"}</th>
            }
            if (key.toUpperCase() === "INFILT") {
                return <th key={index}>{key.toUpperCase() + " (cm)"}</th>
            }
            // return <th key={index}>{key.toUpperCase()}</th>
        })
    }



    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div>
                <h1 id='title' align={"center"}>Mini-disk data</h1>
                <table id='students'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table //exporting a component make it reusable and this is the beauty of react