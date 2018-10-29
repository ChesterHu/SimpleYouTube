import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';  // use relative file path
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
// Create a new component. This component should produce some HTML

const API_KEY = 'AIzaSyDWqzP2ZcL_L6m6hodJBHLL2uJPDTgTyF0';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		// IE6 syntax sugar if names of key and value are identical
		YTSearch({ key: API_KEY, term: term }, videos => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);  // returns a new function, which will call inside function once every 300ms

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} 
				/>
			</div>
		);
	}
};

// Take this component's generated HTML and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));
