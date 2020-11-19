import React from 'react';
import './components/FarmContactCard';
import '../../styles/FarmProfile.css';

class FarmProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            id: null,
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ id: id });
    }

    render() { 
        return ( 
            <div>{`Farm id is ${this.state.id}`}</div>
        );
    }
}
 
export default FarmProfile;