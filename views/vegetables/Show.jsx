const React = require('react');
const DefaultLayout = require('../layout/Default')

class Show extends React.Component {
    render() {
        const vegetable = this.props.vegetable;
        console.log(vegetable);

        return (
            <DefaultLayout title="Show an Individual Vegetable">
                <p>The {vegetable.name} is {vegetable.color}</p>
                {vegetable.readyToEat ? 'It is ready to eat' : "NOT READY!"}
                <br />
                <a href={`/vegetables/${vegetable._id}/edit`}>Edit This Vegetable</a>
                <form action={`/vegetables/${vegetable._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="DELETE" />
                </form>
                <a href="/vegetables">Back to Index</a>
            </DefaultLayout >

        )
    }
}

module.exports = Show;