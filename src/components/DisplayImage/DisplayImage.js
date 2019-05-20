import React, { Component } from 'react';
import { connect } from 'react-redux';



class DisplayImage extends Component {

    state = {
        // images: this.props.redux.images,
        // currentImage: this.props.redux.images[0]
        images_id: 0,
        tags_id: 0
    }

    componentDidMount() {
        // this.loopImage();
    }

    conditionalDownButton = () => {
        return (
            (this.props.redux.images.length > 0) ?
                this.renderDown() :
                <div> </div>
        )
    }

    conditionalImage = () => {
        return (
            (this.props.redux.images.length > 0) ?
                this.renderImage() :
                <div><img src="images/loading.gif" className="loading" alt="loading" /></div>
        )
    }

    conditionalTitle = () => {
        return (
            (this.props.redux.images.length > 0) ?
                this.renderTitle() :
                <div></div>
        )
    }

    handleClick = (event) => {
        console.log(this.state);
        // this.setState({
        //     ...this.state, selectedTag: parseInt(event.target.value)
        // })
        this.props.dispatch({type: 'ADD_TAG', payload: this.state})
    }

    handleSelectionChange = (event) => {
        console.log('handleSelect:', parseInt(event.target.value))
        this.setState({
            tags_id: event.target.value
        })
    }

    // loopImage = () => {
    //     if (this.state.currentIndex = this.props.redux.images.length - 1) {
    //         this.setState({
    //             currentIndex: 0
    //         })
    //     }
    //     if (this.state.currentIndex = 0) {
    //         this.setState({
    //             currentIndex: this.props.redux.images.length - 1
    //         })
    //     }
    //     // this.renderImage();
    // }

    nextImage = () => {
        const newIndex = this.state.images_id + 1;
        // if (this.state.currentIndex = this.props.redux.images.length - 1) {
        //     this.setState({
        //         currentIndex: 0
        //     })
        // }
        // else {
        this.setState({
            images_id: newIndex
        })
        // this.loopImage();
    }

    previousImage = () => {
        const newIndex = this.state.images_id - 1;
        // if (this.state.currentIndex = 0) {
        //     this.setState({
        //         currentIndex: this.props.redux.images.length - 1
        //     })
        // }
        // else {
        this.setState({
            images_id: newIndex
        })
        // }
        // this.loopImage();
    }


    // renderDown = () => {
    //     if (this.state.currentIndex = 0){
    //         return (
    //             <button>First Image</button>
    //         )
    //     }
    //     else {
    //         return (
    //             <button
    //                 onClick={() => this.previousImage()}
    //             >Previous</button>
    //         )
    //     }
    // }

    renderImage = () => {
        // this.loopImage();
        return (
            <img 
                src={this.props.redux.images[this.state.images_id].path} 
            className="display" 
                alt={this.props.redux.images[this.state.images_id].name} />
        );
    }

    renderTitle = () => {
        return (
            this.props.redux.images[this.state.images_id].title
        )
    }



    render() {
        // const { images, currentImage } = this.state;
        console.log('in DisplayImage render', this.state.images_id);
        console.log('redux:', this.props.redux);
        // return (
        // <div className="appImage">
        // <pre>{JSON.stringify(this.props.redux.images)}</pre>
        // console.log("image 0 path is:", this.props.redux.images[0]);
        return (
            <div className="app">
                <div className="imageApp">
                    <h2>{this.conditionalTitle()}</h2>
                    <pre>{JSON.stringify(this.props.redux.images)}</pre>
                    <button
                        onClick={() => this.previousImage()}
                    >Previous</button>
                    {this.conditionalImage()}
                    <button
                        onClick={() => this.nextImage()}
                    >Next</button>
                    {/* <TagSelector currentImageIndex={this.state.currentImageIndex} /> */}
                </div>

                {/* // if (this.state.images.length > 0) { */}
                {/* //     return (
            //         <div>
            //             <img src={this.state.currentImage} />
            //             <button */}
                {/* //                 onClick={() => this.nextImage()}
            //             >Next</button> */}
                {/* //         </div> */}
                {/* //     )
            // }
            // else { */}
                {/* //     return (
            //         <div className="imagePlaceholder">

            //         <button */}
                {/* //             onClick={() => this.nextImage()}
            //         >Next</button> */}
                {/* //         </div> */}
                {/* //     )
            // }
            // 
            // </div> */}
                {/* // ) */}

                {/* ---------- TAGS ---------- */}
                < div className="tagsApp" >
                    <select onChange={this.handleSelectionChange}>
                        <option disabled value="0">Select Tag</option>
                        {/* <select value={this.state.tags_id} onChange={this.handleTagChange}> */}
                        {this.props.tags.map(tag => {
                            return (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            )
                        })}

                    </select>
                    <button onClick={this.handleClick}>Apply Tags</button>
                    <pre>{JSON.stringify(this.props.tags)}</pre>
                    <p>Tags Go Here</p>
                </div >
            </div>
        )
    }
}


const mapStateToProps = (redux) => {
    return {
        redux,
        tags: redux.tags
    }
}

export default connect(mapStateToProps)(DisplayImage);