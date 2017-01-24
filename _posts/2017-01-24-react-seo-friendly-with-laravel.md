---
layout: post
title: React App SEO Friendly With Laravel
subtitle: Data ready when page loaded and SEO friendly React app with Laravel
bigimg: /img/posts/2017-01-24/banner.jpg
share-img: /img/posts/2017-01-24/banner.jpg
---

When developing SPA (Single Page Application), the most headache thing is SEO and blank page (waiting spinner) when page first loaded.

SEO in SPA is tricky with many methods. Sometime, we think about switching to NodeJs with Isomorphic (Same code base share between client and server with server rendering JS).

But if you not familiar with NodeJs or be in loved with some other Programing languages and don't want to move. It's realy a pain.

Luckily, search engines (SE) such as Google search are smarter day by day.

They can parse JS app (that's amazing) but they still lazy because they just grabbing init render result of JS app and ignore any Ajax call after that. That mean any request form your app to API for getting data to update UI is completely ignore.

At least, SE can see init result of your SPA app then why not we provide our JS app the init data rendered directly from server? If this circumstance happen, SE can see all what you want them see, that's our goal.

Let's begin with an ordinary ReactJS app, the index.html file:


```html
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="utf-8"/>
        <title>Title</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="/dist/bundle.js"></script>
    </body>
</html>
```

```bundle.js``` is the output file when we compile source code with webpack or something else.

If this file servered by web server (Nginx or Apache...) then we can do anything.

But if we render this file by a web framework, we can insert the init data to this file and components inside bundle.js can reach that init data. In this case, I use Laravel framework.

Let's put that bundle HTML in to a blade template:

{% raw %}
```html
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="utf-8"/>
        <title>Title</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript">
            window.initData = {!! $initData !!};
        </script>
        <script src="{{config('app.client_url')}}"></script>
    </body>
</html>
```
{% endraw %}

The most important thing is here: ```window.initData = {!! $initData !!};```

Components inside ```bundle.js``` can ```access window.initData``` variable.

This template rendered by a controller:

```php
<?php
namespace App\Modules\Backend\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\Tools;
use App\Helpers\ValidateTools;
use App\Modules\Config\Models\Config;

class BackendController extends Controller{
    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(){
        # parent::__construct();
    }

    public function login(Request $request){
        $data = [];
        $data["initData"] = Config::list(); // Get some data from config table
        return view('Backend::main', ValidateTools::toJson($data));
    }
}
```

This controller used by a route:

```php
<?php

Route::group(["prefix" => "admin"],
    function() {
        $module = "Backend";
        $controller = "\App\Modules\\{$module}\Controllers\\{$module}Controller";
        Route::get("login", ["uses" => "{$controller}@login"]);
    }
);
```

In ```bundle.js``` I use ```react-redux-router```, you can use ```react-router``` only.

The route of login component must the same with current laravel route: ```/admin/login```

{% raw %}
```html
...
<Route path="admin" component={App} onChange={onChange} onEnter={onEnter}>
    <Route
        path="login"
        component={Login}
        params={{login: false}}></Route>
</Route>
...
```
{% endraw %}

When user navigate to: ```http://mydomain.com/admin/login``` then ```Login``` component will show up.

My ```Login``` component source code is:


{% raw %}
```jsx

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Modal from 'react-modal';

import { SubmissionError, reset } from 'redux-form';
import md5 from 'blueimp-md5';

import * as actionCreators from 'app/actions/actionCreators';
import FormLogin from './forms/FormLogin';
import FormResetPassword from './forms/FormResetPassword';
import Tools from 'helpers/Tools';
import {apiUrls, labels} from './_data';
import {apiUrls as configApiUrls} from 'components/config/_data';
import store from 'app/store';

import CustomModal from 'utils/components/CustomModal';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resetPasswordModal: false,
            serverString: '',
            serverData: [],
            fetchResponse: []
        };
    }

    componentDidMount(){
        document.title = "Login";

        if(window.initData){
            this.setState({serverData: window.initData.data.items});
        }

        Tools.apiCall(configApiUrls.list, {}, false).then((result) => {
            if(result.success){
                this.setState({fetchResponse: result.data.items})
            }
        });
    }

    loginHandle(eventData, dispatch){
        try{
            const params = {
                ...eventData,
                password: md5(eventData.password)
            };
            return Tools.apiCall(apiUrls.authenticate, params).then((result) => {
                if(result.success){
                    Tools.setStorage('authData', result.data);
                    dispatch(reset('FormLogin'));
                    Tools.goToUrl();
                }else{
                    throw new SubmissionError(Tools.errorMessageProcessing(result.message));
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    resetPasswordHandle(eventData, dispatch){
        try{
            const params = {
                ...eventData,
                password: md5(eventData.password)
            };
            if(eventData.password !== eventData.newPassword){
                return Tools.sleep().then(() => {
                    throw new SubmissionError(Tools.errorMessageProcessing('Passwords not matched!'));
                });
            }
            return Tools.apiCall(apiUrls.resetPassword, params).then((result) => {
                if(result.success){
                    this.toggleModal('resetPasswordModal', false);
                }else{
                    throw new SubmissionError(Tools.errorMessageProcessing(result.message));
                }
            });
        }catch(error){
            console.error(error);
        }
    }

    toggleModal(state, value=true){
        let newState = {};
        newState[state] = value;
        this.setState(newState);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">

                    <div className="well">
                        <p>
                            <strong>
                                Login Form
                            </strong>
                        </p>

                        <p>
                            Please enter your username as email & password.
                        </p>

                        <FormLogin
                            checkSubmit={this.loginHandle.bind(this)}
                            labels={labels.login}
                            submitTitle="Login">
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => this.toggleModal('resetPasswordModal')}>
                                Forgot password
                            </button>
                        </FormLogin>

                        <div className="row">
                            <div className="col-sm-6">
                                <ul>
                                    {this.state.serverData.map( (item, index) =>{
                                        return <li key={index}>{item.uid}</li>
                                    })}
                                </ul>
                            </div>
                            <div className="col-sm-6">
                                <ul>
                                    {this.state.fetchResponse.map( (item, index) =>{
                                        return <li key={index}>{item.uid}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <CustomModal
                        open={this.state.resetPasswordModal}
                        close={() => this.toggleModal('resetPasswordModal', false)}
                        size="md"
                        title="Reset password"
                        >
                        <div>
                            <div className="custom-modal-content">
                                <FormResetPassword
                                    checkSubmit={this.resetPasswordHandle.bind(this)}
                                    labels={labels.resetPassword}
                                    submitTitle="Reset password">

                                    <button
                                        type="button"
                                        className="btn btn-warning cancel"
                                        onClick={() => this.toggleModal('resetPasswordModal', false)}>
                                        <span className="glyphicon glyphicon-remove"></span> &nbsp;
                                        Cancel
                                    </button>
                                </FormResetPassword>
                            </div>
                        </div>
                    </CustomModal>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
};

Login.defaultProps = {
};

function mapStateToProps(state){
    return {
    }
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators(actionCreators, dispatch),
        resetForm: (formName) => {
            dispatch(reset(formName));
        }
    };
}

Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default Login;


```
{% endraw %}