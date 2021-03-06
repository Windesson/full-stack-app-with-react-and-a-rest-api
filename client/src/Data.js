import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, encodedCredentials = null) {
      const url = config.apiBaseUrl + path;
    
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
      }
  
      // Check if auth is required
      if (encodedCredentials) {    
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }
  
      return fetch(url, options);
    }
  
    async getUser(encodedCredentials) {
      const response = await this.api(`/users`, 'GET', null, encodedCredentials);
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
    }

    async getCourses() {
        const response = await this.api(`/courses`);
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
    }

    async getCourse(id) {
      const response = await this.api(`/courses/${id}`);
      if (response.status === 200) {
        return response.json().then(course => { return {status: response.status, data: course}});
      }
      else if (response.status === 400) {
        return response.json().then(data => { return {status: response.status, errors: data.errors}});
      }
      else if (response.status === 404) {
        return response.json().then(data => { return {status: response.status, message: data.message}});
      }
      else {
        throw new Error();
      }
    }

    async deleteCourse(id, encodedCredentials) {
      const response = await this.api(`/courses/${id}`,'DELETE', null, encodedCredentials);
      if (response.status === 204) {
        return { status: 204 };
      }
      else if (response.status === 400 || response.status === 403) {
        return response.json().then(data => {
          return { status:400, errors: data.errors};
        });
      }
      else {
        throw new Error();
      }
    }

    async updateCourse(course, encodedCredentials) {
      const response = await this.api(`/courses/${course.id}`,'PUT', course, encodedCredentials);
      if (response.status === 204) {
        return { status: 204};
      }
      else if (response.status === 400 || response.status === 403) {
        return response.json().then(data => {
          return { status:400, errors: data.errors};
        });
      }
      else {
        throw new Error();
      }
    }

    async createCourse(course, encodedCredentials) {
      const response = await this.api(`/courses`,'POST', course, encodedCredentials);
      if (response.status === 201) {
        return { status:response.status, data: response.location };
      }
      else if (response.status === 400) {
        return response.json().then(result => {
          return { status: response.status, errors: result.errors};
        });
      }
      else {
        throw new Error();
      }
    }
    
    async createUser(user) {
      const response = await this.api('/users', 'POST', user);
      if (response.status === 201) {
        return [];
      }
      else if (response.status === 400) {
        return response.json().then(data => {
          return data.errors;
        });
      }
      else {
        throw new Error();
      }
    }
  }
  