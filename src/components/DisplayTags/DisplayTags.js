import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayTags extends Component {
    render() {
        return(
            <div className="tagsApp">
                <select>
                    <option disabled value="0">Select Tag</option>
                {/* <select value={this.state.tags_id} onChange={this.handleTagChange}> */}
                    {this.props.tags.map(tag => {
                        return (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                            
                        )
                    })}

                </select>
            <button>Apply Tags</button>
                <pre>{JSON.stringify(this.props.tags)}</pre>
            <p>Tags Go Here</p>
            </div>
        )
    }
}

const mapStateToProps = (redux) => {
    return {
        tags: redux.tags
    }
}

export default connect(mapStateToProps)(DisplayTags)