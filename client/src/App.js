import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import * as postService from './services/postService'

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import ContactUs from './components/ContactUs/ContactUs';

import style from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      selectedPost: null,
    }

    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }

  componentDidMount() {
    postService.getAll()
      .then(posts => {
        this.setState({ posts })
      });
  }

  onMenuItemClick(id) {
    this.setState({ selectedPost: id });
  }

  getPosts() {
    if (!this.state.selectedPost) {
      return this.state.posts;
    } else {
      return this.state.posts.filter(x => x.id == this.state.selectedPost)
    }
  }

  render() {
    return (
      <div className={style.app}>
        <Header />

        <div className={style.container}>
          <Menu onMenuItemClick={this.onMenuItemClick} />

          <Switch>            
            <Route path="/" exact>
              <Main posts={this.getPosts()} />
            </Route>
            <Route path="/about/:name" component={About} />
            <Route path="/contact-us" component={ContactUs} />
            <Route render={()=> <h1>Error Page</h1>} />
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;