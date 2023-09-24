
export const Login = (props: any) => {
    const {change} = props;

    return (
        <>
            <input type="text" name="username" />
            <input type="text" name="password" />
            <button type="button" onClick={() => change('value')}>Submit</button>
        </>
    )
}