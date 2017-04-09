var React = require('react');
var ReactDOM = require('react-dom');
import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';
import BodyIndex from './components/BodyIndex';

class Index extends React.Component {
    render () {
        var loginState = false; // 用户是否登录的状态
        if (loginState) {

        } else {

        }

        var components = <ComponentHeader/>;
        return (
            <div>
                {components}
                <BodyIndex/>
                <ComponentFooter/>
            </div>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('example'));
