# UME
[Before starting, you can learn how to configure the server →](https://github.com/kosyachniy/dev/blob/main/server/SERVER.md)

<table>
    <thead>
        <tr>
            <th>local</th>
            <th>prod</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td valign="top">
                1. Configure <code> .env </code> from <code> base.env </code> and add:
                <pre>
# Type
MODE=LOCAL<br />

\# Links
PROTOCOL=http
EXTERNAL_HOST=localhost
                </pre>
            </td>
            <td valign="top">
                1. Configure <code> .env </code> from <code> base.env </code> and add:
                <pre>
\# Type
MODE=PROD

\# Links
PROTOCOL=https
EXTERNAL_HOST=ume.kosyachniy.com
                </pre>
            </td>
        </tr>
        <tr>
            <td>
                2. <code> npm start </code>
            </td>
            <td>
                2. <code> make set </code>
            </td>
        </tr>
        <tr>
            <td>
                3. Open ` http://localhost/ `
            </td>
            <td>
                3. Open ` https://ume.kosyachniy.com/ `
            </td>
        </tr>
    </tbody>
</table>
