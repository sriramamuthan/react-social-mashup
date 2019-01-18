import React, { Component } from 'react';

interface Tweet {
    id:number;
    text: string;
    user: User;
}

interface User{
    screen_name : string;
    profile_background_image_url : string;
    profile_image_url :string;
}

interface TrendingListProps {
}

interface TrendingListState {
    trendings: Array<Tweet>;
    isLoading: boolean;
    topic: string;
}

class TrendingList extends Component<TrendingListProps, TrendingListState> {

    constructor(props: TrendingListProps) {
        super(props);
        this.state = {
            trendings: [],
            isLoading: false,
            topic: ''
        };
    }

    async componentDidMount() {
        if(this.state.topic == "" || this.state.topic == null) return;
        const eventSource = new EventSource('http://localhost:8080/twitter/trends?topic='+this.state.topic);
        eventSource.onmessage = (event: any) => {
            const profile = JSON.parse(event.data);
            this.state.trendings.unshift(profile);
            this.state.trendings.splice(0, this.state.trendings.length - 100)
            this.setState({trendings: this.state.trendings, isLoading:false });
        };
    }

    handleChange(e: any) {
        this.setState({ topic: e.target.value });
        this.componentDidMount();
    }

    onError() {

    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.topic}
                    onChange={ this.handleChange.bind(this) }
                    placeholder="Topic of Interest" />
                {this.state.trendings.map((trending: Tweet) =>
                    <div key={trending.id}>
                    <div className='image'>
                    <img src={trending.user.profile_image_url} onError={this.onError.bind(this)}/>
                    </div>
                    <div className='content'>
                    <div>{trending.user.screen_name}</div>
                    <div>{trending.text}</div>
                    </div>
                    </div>
                )}
            </div>
        );
    }
}

export default TrendingList;