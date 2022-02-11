import React,{Component} from 'react';
import {variables} from './Variables';

export class Book extends Component{

    constructor(props){
        super(props);

        this.state={
            books:[],
            modalTitle:"",
            Name:"",
            Year:"",
            Genre:"",
            Author:"",
            Id:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'library')
        .then(response=>response.json())
        .then(data=>{this.setState({books:data})})
    }

    componentDidMount(){
        this.refreshList();
    }

    changeBookName = (e)=>{
        this.setState({Name:e.target.value});
    }

    changeBookAuthor = (e)=>{
        this.setState({Author:e.target.value});
    }

    changeBookYear = (e)=>{
        this.setState({Year:e.target.value});
    }

    changeBookGenre = (e)=>{
        this.setState({Genre:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Добавление книги",
            Id:0,
            Name:"",
            Year:"",
            Genre:"",
            Author:""
        });
    }

    editClick(book){
        this.setState({
            modalTitle:"Редактирование книги",
            Id:book.id,
            Name:book.name,
            Year:book.year,
            Genre:book.genre,
            Author:book.author
        });
    }

    createClick(){
        if (!this.state.Name || !this.state.Year || !this.state.Genre || !this.state.Author) {
            alert('Поля не должны быть пустыми')
            return;
        }
        fetch(variables.API_URL+'Library',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:this.state.Name,
                Year:this.state.Year,
                Genre:this.state.Genre,
                Author:this.state.Author
            })
        })
        .then(response=>response.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Ошибка!')
        })
    }

    updateClick(){
        fetch(variables.API_URL+'Library',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:this.state.Id,
                Name:this.state.Name,
                Year:this.state.Year,
                Genre:this.state.Genre,
                Author:this.state.Author
            })
        })
        .then(response=>response.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Ошибка!');
        })
    }

    deleteClick(id){
        if(window.confirm('Вы уверенны?')){
            fetch(variables.API_URL+'Library/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(response=>response.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Ошибка!')
            })    
        }
    }

    render(){

        const{
            books,
            modalTitle,
            Name,
            Year,
            Genre,
            Author,
            Id
        }=this.state;

        return(
            <div>

                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#bookModal" onClick={()=>this.addClick()}>Добавить книгу</button>

                 <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Название книги</th>
                            <th>Автор</th>
                            <th>Год</th>
                            <th>Жанр</th>
                            <th>Действия</th>
                        </tr>                      
                    </thead>
                    <tbody>
                        {books.map(book=>
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.genre}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#bookModal" onClick={()=>this.editClick(book)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button> 

                                    <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(book.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                    </button>  

                                </td>
                            </tr>
                            )}

                    </tbody>
                </table>


                <div className="modal fade" id="bookModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Название книги</span>
                                    <input type="text" className="form-control" value={Name} onChange={this.changeBookName}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Автор</span>
                                    <input type="text" className="form-control" value={Author} onChange={this.changeBookAuthor}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Год</span>
                                    <input type="text" className="form-control" value={Year} onChange={this.changeBookYear}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Жанр</span>
                                    <input type="text" className="form-control" value={Genre} onChange={this.changeBookGenre}/>
                                </div>
                            </div>

                            <div className="modal-footer">
                                {Id===0 ? <button type="button" className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={()=>this.createClick()}>Создать</button> : null}
                                {Id!==0 ? <button type="button" className="btn btn-primary float-start" data-bs-dismiss="modal" onClick={()=>this.updateClick()}>Редактировать</button> : null}
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

