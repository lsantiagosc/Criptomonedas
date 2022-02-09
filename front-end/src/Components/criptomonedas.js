import React, { Component } from 'react';
import axios from 'axios'
import DataTable from 'react-data-table-component'
import './criptomonedas.css'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import swal from 'sweetalert'

export class criptomonedas extends Component {
    state = {
        cripto_moneda: [],
        nombre: '',
        usd: '',
        params: {},
        res: {}
    }
    getCriptomonedas = async () => {
        const res = await axios.get("http://localhost:5000/crypto")
        //console.log(res.data);
        this.setState({
            cripto_moneda:res.data
        }) 
        //estilos datatable
        const dat = {
            columns: [
                { name: 'Id', selector: row => row.id, sortable: true},
                { name: 'Nombre', selector: row => row.nombre, sortable: true},
                { name: 'Precio (USD)', selector: row => row.usd, sortable: true, right: true },
            ],
            data: res.data
        }
        this.setState({ params: dat })
        //console.log(dat);
    }

    async componentDidMount(){
        //obtener data
        this.getCriptomonedas();
    }

     //captar cada cambio en el input
     onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        //console.log(this.state.nombre); 
    }

    onSubmit = async e => {
        e.preventDefault()
        const criptomonedas = {
            nombre: this.state.nombre,
            usd: this.state.usd
        }     

        //console.log(criptomonedas);
        let res = await axios.post("http://localhost:5000/crypto", criptomonedas)
        
        //console.log(res.data.ok/message);
        if(res.data.ok ===false){
            swal({
                text: res.data.message,
                icon: "error",
                button: "Aceptar"
            })
        }else{
            swal({
                text: res.data.message,
                icon: "success",
                button: "Aceptar"
            })
        }
        let res2 = await axios.get("http://localhost:5000/crypto")
        //console.log(res.data);
        this.setState({
            cripto_moneda:res2.data,
            nombre: "",
            usd: ""
        }) 
         //obtener data
        this.getCriptomonedas();
    }

  render() {
    return <div className="container p-4" style = {{minHeight: "85vh"}}>
                <div className="row" >  
                    <div className="col-md-4">
                        <h3>Añadir</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                    placeholder='Nombre Criptomoneda'
                                        name="nombre"
                                        type="text"
                                        className="form-control"
                                        value={this.state.nombre}
                                        required
                                        onChange={this.onChangeInput} />
                                </div>
                                <div className="form-group">
                                    <input
                                        placeholder='Precio USD'
                                        name="usd"
                                        type="number"
                                        className="form-control"
                                        value={this.state.usd}
                                        required
                                        onChange={this.onChangeInput} />
                                </div>
                                <button type="submit" className="btn btn-primary">Crear</button>
                            </form>
                    </div>
                    <div className="col-md-8">
                        <h3>Listado</h3>
                        <DataTableExtensions print={false} export={false} filterPlaceholder={"Buscar"}{...this.state.params} >
                                <DataTable striped/>
                                </DataTableExtensions>
                    </div>
            </div>
    </div>
  }
}
export default criptomonedas;
