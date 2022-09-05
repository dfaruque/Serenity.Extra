namespace SerExtraNet5.ExtraSamples {

    export class Profile extends React.Component<any> {

        render(): React.ReactNode {
            var welcomeStyle: React.CSSProperties = { color: 'red' };
            return (
                <div style={welcomeStyle}>
                    Welcome to react
                </div>
            );
        }
    }
}