import React, { Component } from 'react';
import { connect } from 'react-redux';



class DisplayImage extends Component {

    state = {
        // images: this.props.redux.images,
        // currentImage: this.props.redux.images[0]
        currentIndex: 0
    }

    loopImage = () => {
        if (this.state.currentIndex > this.props.redux.images.length - 1) {
            this.setState({
                currentIndex: 0
            })
        }
        if (this.state.currentIndex < 0) {
            this.setState({
                currentIndex: this.props.redux.images.length - 1
            })
        }
        this.renderImage();
    }

    nextImage = () => {
        const newIndex = this.state.currentIndex + 1;
        this.setState({
            currentIndex: newIndex
        })
    }

    previousImage = () => {
        const newIndex = this.state.currentIndex - 1;
        this.setState({
            currentIndex: newIndex
        })
    }

    

    conditionalImage = () => {
        return (
            (this.props.redux.images.length > 0) ?
                this.renderImage() :
                <div><img src="images/AbstractShapes.jpg" /></div>
        )
    }

    renderImage = () => {
        // this.loopImage()
        return (
            <img src={this.props.redux.images[this.state.currentIndex].path} />
        )
    }

    render() {
        // const { images, currentImage } = this.state;
        console.log('in DisplayImage render', this.state.currentImage);
        console.log('redux:', this.props.redux);
        // return (
        // <div className="appImage">
        // <pre>{JSON.stringify(this.props.redux.images)}</pre>
        console.log("image 0 path is:", this.props.redux.images[0]);
        return (
            <div>
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
        )
        // if (this.state.images.length > 0) {
        //     return (
        //         <div>
        //             <img src={this.state.currentImage} />
        //             <button
        //                 onClick={() => this.nextImage()}
        //             >Next</button>
        //         </div>
        //     )
        // }
        // else {
        //     return (
        //         <div className="imagePlaceholder">

        //         <button
        //             onClick={() => this.nextImage()}
        //         >Next</button>
        //         </div>
        //     )
        // }
        // 
        // </div>
        // )
    }
}

const mapStateToProps = (redux) => {
    return {
        redux
    }
}

export default connect(mapStateToProps)(DisplayImage);