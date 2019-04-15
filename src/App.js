import React, { Component } from 'react';
import FileUpload from './FileUpload';
import Content from './Content';

class App extends Component {

  render() {
    return (
      /*<!-- Always shows a header, even in smaller screens. -->*/
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            {/*<!-- Title -->*/}
            <span className="mdl-layout-title">Movil SP</span>
            {/*<!-- Add spacer, to align navigation to the right -->*/}
            <div className="mdl-layout-spacer"></div>
            {/*<!-- Navigation. We hide it in small screens. -->*/}
            <nav className="mdl-navigation">
              {/*<!-- Simple Textfield -->*/}
            <FileUpload hola="hello world"/>
              
            </nav>
          </div>
        </header>
        <main className="mdl-layout__content">
          <Content />
        </main>
      </div>
    );
  }
}

export default App;
