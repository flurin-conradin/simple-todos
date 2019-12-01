import './reactMap.css'

import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import { Meteor } from 'meteor/meteor';
import { Stations } from '../api/stations';
import { withTracker } from 'meteor/react-meteor-data';

const Station = ({ name }) => <div className="station" >{name}</div>;

class SimpleMap extends Component {

    static defaultProps = {
        center: { lat: 46.92, lng: 8.38 },
        zoom: 9
    };

    render() {
        return (
            <div className='mapHeight'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: Meteor.settings.public.googleApiKey }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {this.props.stations.map((station, index) =>
                        <Station key={index}
                            lat={station.lat}
                            lng={station.lon}
                            name={station.name}
                        />
                    )}
                </GoogleMapReact>
            </div>
        )
    }
}

const SimpleMapContainer = withTracker(() => {
    const todosHandle = Meteor.subscribe('stations');
    const stations = Stations.find({}).fetch();
    return {
        stations,
    };
})(SimpleMap);

export { SimpleMapContainer }



