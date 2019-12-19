import './map.html';

import { SimpleMapContainer } from './reactMap';
import { Template } from 'meteor/templating';

Template.map.helpers
    'Map': ->
        SimpleMapContainer