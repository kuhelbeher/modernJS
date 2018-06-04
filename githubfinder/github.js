class GitHub {
	constructor() {
		this.client_id = 'd598489faf7e9bb0e114';
		this.client_secret = '184aca71ddff1164815c88f724e7997311df172e';
		this.repos_count = 5;
		this.repos_sort = 'created: asc';
	}

	async getUser(user) {
		const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

		const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

		const profile = await profileResponse.json();

		const repos = await reposResponse.json();

		return {
			profile,
			repos
		}
	}
}