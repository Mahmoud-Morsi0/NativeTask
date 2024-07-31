export default class Table {
    constructor(user) {
        this.dateOfBirth = user.dateOfBirth;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }

    render() {
        return `
      <tr >
        <td>${this.dateOfBirth}</td>
        <td>${this.firstName}</td>
        <td>${this.lastName}</td>
      </tr>
    `;
    }
}
