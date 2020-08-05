import React, { Component } from "react";
import axios from "axios";
import book_image from "./images/book_image.jpg";
import image from "./images/image.jpg";
import "./App.css";

class App extends Component {
  state = {
    words: [],
    result: "Click on button to see answer",
  };

  async componentDidMount() {
    const { data: words } = await axios.get("http://localhost:9000/api");
    this.setState({ words });
  }

  handleShow = async (word) => {
    //console.log(word);
    const { data: result } = await axios.get(
      "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf&lang=en-ru&text=" +
        word
    );
    //console.log(result.def[0].pos);
    if (result) {
      try {
        this.setState({ result: result.def[0].pos });
      } catch (e) {
        this.setState({ result: "No POS Found" });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            Word Counter: Top 10 Words from the book
          </span>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col">
              <img
                src={book_image}
                alt="book_image"
                className="img-thumbnail"
              />
              <p>
                The Adventures of Sherlock Holmes is a collection of twelve
                short stories by Arthur Conan Doyle, first published on 14
                October 1892.
              </p>
            </div>
            <div className="col-6">
              <table className="table table-sm table-bordered ">
                <thead className="thead-dark">
                  <tr>
                    <th>English Word</th>
                    <th>Count </th>
                    <th>Part Of Speech</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.words.map((word) => (
                    <tr key={word.Word}>
                      <td>{word.Word}</td>
                      <td>{word.count}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => this.handleShow(word.Word)}
                        >
                          Show Answer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col">
              <div className="card text-white bg-primary mb-3">
                <h5>Result: </h5>
                <p>{this.state.result}</p>
              </div>
              <h4>Next Book</h4>
              <div>
                <img src={image} alt="book_image" className="img-thumbnail" />
                <p>Click to know more</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer"></div>
      </React.Fragment>
    );
  }
}

export default App;
