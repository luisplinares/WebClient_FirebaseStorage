import React from 'react';
import {app} from './tests'

const messaging = app.messaging();
var temp_imgs = [];
var ctx;

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
        ctx = this;
        this.getContent = this.getContent.bind(this);
        this.setUpNotifications = this.setUpNotifications.bind(this);
    }

    componentDidMount(){
        this.getContent();
        this.setUpNotifications();
    }

    getContent(){
        var request = require('request');
        request.get({
            url:'https://us-central1-fir-movil-224dc.cloudfunctions.net/images',
            headers:{
                'Access-Control-Allow-Origin': '*'
            }
        }, (err,res,body)=>{
            temp_imgs = JSON.parse(body).imagesUrls;
            console.log(temp_imgs);
            this.setState({images:temp_imgs});
        });
        
    }

    setUpNotifications() {
        messaging.usePublicVapidKey("BJP4WaLX9cMD13m4b-A4nktTaKDHBLIcAqEY2UU2U_1BmGDQAPrhGw4-UBglfLZPcxrLKBMiJfo6x_trTPFvIq8");
        messaging.requestPermission()
            .then(() => {
                alert('Notification permission granted!');
                // Get Instance ID token. Initially this makes a network call, once retrieved
                // subsequent calls to getToken will return from cache.
                messaging.getToken().then(function (currentToken) {
                    if (currentToken) {
                        alert(`Token: \n ${currentToken}`);
                        console.log('Token: ', currentToken);
                    } else {
                        // Show permission request.
                        alert('No Instance ID token available. Request permission to generate one.');
                        // Show permission UI.

                    }
                }).catch(function (err) {
                    alert(`An error occurred while retrieving token. ${err}`);
                });
            })
            .catch((err) => {
                alert(`Unable to get permission to notify ${err}`)
            });

        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(function () {
            messaging.getToken().then(function (refreshedToken) {
                alert(`Token refreshed. ${refreshedToken}`);
                // Indicate that the new Instance ID token has not yet been sent to the
                // app server.

                // Send Instance ID token to app server.
                // ...
            }).catch(function (err) {
                alert(`Unable to retrieve refreshed token ${err}`);
            });
        });

        messaging.onMessage(function (payload) {
            console.log('Message received. ', payload.data.new_image_url);
            // ...
            
            alert(`Message received: ${payload.data.new_image_url}`);
            temp_imgs.push(payload.data.new_image_url);
            ctx.setState({images: temp_imgs});
        });
    }

    render() {
        return (
            <div className="page-content">
                <div className="mdl-grid" style={{ maxWidth: 1000 }}>
                    {this.state.images.map((url, index) =>
                        <div className="mdl-cell mdl-cell--4-col mdl-cell--4-col-phone" key={index}>
                            <div className="demo-card-image mdl-card mdl-shadow--2dp" style={{ background: `url(${url}) center / cover` }}>
                                <div className="mdl-card__title mdl-card--expand">
                                </div>
                                <div className="mdl-card__actions">
                                    <span className="demo-card-image__filename">Image.jpg</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Content;