import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayImage extends Component {

    render() {
        return (
            <div>
                <p>Current Image Goes Here</p>
                {
                    this.props.image.map(image => {
                        return (
                            <img src={image.path} />
                        )
                    })
                }
            </div>
        )
    }

}

const mapStateToProps = (redux) => {
    return {
        image: redux.images
    }
}

export default connect(mapStateToProps)(DisplayImage);