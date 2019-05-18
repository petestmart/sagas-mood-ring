import React, {Component} from 'react';
import { connect } from 'react-redux';

class DisplayImage extends Component {

    render() {
        return (
            <p>Current Image Goes Here</p>
        )
    }

}

const mapStateToProps = (redux) => {
    return {
        redux
    }
}

export default connect(mapStateToProps)(DisplayImage);