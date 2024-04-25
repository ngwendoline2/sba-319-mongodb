const React = require('react');
const DefaultLayout = require('../layout/Default')

class New extends React.Component {
    render () {
        return (
            <DefaultLayout title={'Add a New Vegetable'}>
                {/* NOTE: action will be the route, method will be the HTTP verb */}
                <form action='/vegetables' method="POST">
                    Name: <input type="text" name="name" /><br />
                    Color: < input type="text" name="color"/> <br />
                    Is Ready to Eat: <input type="checkbox" name="readyToEat"/> <br />
                    <input type="submit" name="" value="Create Vegetable"/>
                </form>
            </DefaultLayout>
        )
    }
}

module.exports = New;