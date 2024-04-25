const React = require('react');
const DefaultLayout = require('../layout/Default')

class Show extends React.Component {
    render() {
        const fruit = this.props.fruit;

        return (
            <DefaultLayout title="Show an Individual Fruit">
                <p>The {fruit.name} is {fruit.color}</p>
                {fruit.readyToEat ? 'It is ready to eat' : "NOT READY!"}
                <br />
                <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="DELETE" />
                </form>
                <a href="/fruits">Back to Index</a>
            </DefaultLayout >

        )
    }
}

module.exports = Show;