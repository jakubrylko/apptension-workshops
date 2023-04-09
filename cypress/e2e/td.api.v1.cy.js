import _ from 'lodash';
import { hexColorGenerator, numberGenerator } from '../support/data-gen';

describe('API Assignment', () => {
  let randomColor;
  let randomNumber;
  let projectId;

  it('[A-3] Should create new project', () => {
    randomColor = hexColorGenerator();
    randomNumber = numberGenerator();

    // Add new project
    cy.api({
      method: 'POST',
      url: `${Cypress.env('td_api_url')}/projects`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
      body: {
        name: `JR Cypress Project ${randomNumber}`,
        color: randomColor,
        archived: false,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      projectId = response.body.id;

      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name', `JR Cypress Project ${randomNumber}`);
      expect(response.body).to.have.property('color', randomColor);
      expect(response.body.archived).to.equal(false);
    });

    // Get list of projects
    cy.api({
      method: 'GET',
      url: `${Cypress.env('td_api_url')}/projects?sort=-id`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
    }).then((response) => {
      expect(response.status).to.equal(200);

      const project = _.find(response.body, { id: projectId });
      expect(project.id).to.exist.and.equal(projectId);
    });
  });

  it('[A-1] Should get single project', () => {
    // Get single project
    cy.api({
      method: 'GET',
      url: `${Cypress.env('td_api_url')}/projects/${projectId}`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name', `JR Cypress Project ${randomNumber}`);
      expect(response.body).to.have.property('color', randomColor);
      expect(response.body.archived).to.equal(false);
    });
  });

  it('[A-2] Should get list of projects', () => {
    const idArr = [];
    const nameArr = [];

    // Get list of projects
    cy.api({
      method: 'GET',
      url: `${Cypress.env('td_api_url')}/projects?sort=-id`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.be.an('array');
      response.body.forEach(($element) => {
        expect($element).to.be.an('object');
      });

      response.body.forEach(($element) => {
        expect($element).to.have.property('id').and.be.a('number');
        expect($element).to.have.property('name').and.be.a('string');
        expect($element)
          .to.have.property('color')
          .and.match(/^#[0-9a-fA-F]{6}$/);
        expect($element).to.have.property('archived').and.be.a('boolean');
      });

      response.body.forEach(($element) => idArr.push($element.id));
      expect(_.uniq(idArr).length).to.equal(idArr.length);

      response.body.forEach(($element) => nameArr.push($element.name));
      console.log(nameArr);
    });
  });

  it('[A-4] Should update existing project', () => {
    randomColor = hexColorGenerator();

    // Update project
    cy.api({
      method: 'PUT',
      url: `${Cypress.env('td_api_url')}/projects/${projectId}`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
      body: {
        name: `JR Cypress Project ${randomNumber}`,
        color: randomColor,
        archived: true,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.have.property('id', projectId);
      expect(response.body).to.have.property('name', `JR Cypress Project ${randomNumber}`);
      expect(response.body).to.have.property('color', randomColor);
      expect(response.body.archived).to.equal(true);
    });

    // Get projects list
    cy.api({
      method: 'GET',
      url: `${Cypress.env('td_api_url')}/projects?sort=-id`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
    }).then((response) => {
      expect(response.status).to.equal(200);

      const updatedProject = _.find(response.body, { id: projectId });
      expect(updatedProject.id).to.exist.and.equal(projectId);
    });
  });

  it('[A-5] Should create project, resource, booking and time entry', () => {
    randomColor = hexColorGenerator();
    randomNumber = numberGenerator();

    let mainUnitId;
    let resourceId;
    let adminId;
    let timeEntryId;

    // Add new project
    cy.api({
      method: 'POST',
      url: `${Cypress.env('td_api_url')}/projects`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
      body: {
        name: `JR Cypress Project ${randomNumber}`,
        color: randomColor,
        archived: false,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      projectId = response.body.id;
    });

    // Get units in organization
    cy.api({
      method: 'GET',
      url: `${Cypress.env('td_api_url')}/organization-units`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      const mainUnit = response.body.find((obj) => obj.name === 'Main');

      mainUnitId = mainUnit.id;
      expect(mainUnitId).to.be.a('number');
    });

    // Add new basic resource
    cy.api({
      method: 'POST',
      url: `${Cypress.env('td_api_url')}/resources`,
      headers: {
        'X-Api-Key': Cypress.env('td_api_key'),
      },
      body: {
        name: `JR Cypress Project ${randomNumber}`,
        active: false,
        is_part_time: true,
        contract_start_date: '2023-04-20',
        contract_end_date: '2030-08-20',
        organization_unit_id: mainUnitId,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');

      resourceId = response.body.id;
      expect(resourceId).to.be.a('number');

      // Activate new resource
      cy.api({
        method: 'PUT',
        url: `${Cypress.env('td_api_url')}/resources/${resourceId}/activate`,
        headers: {
          'X-Api-Key': Cypress.env('td_api_key'),
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.active).to.equal(true);
      });

      // Get resources in organization
      cy.api({
        method: 'GET',
        url: `${Cypress.env('td_api_url')}/resources`,
        headers: {
          'X-Api-Key': Cypress.env('td_api_key'),
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        const admin = response.body.find((obj) => obj.role === 'superadmin');

        adminId = admin.id;
        expect(adminId).to.be.a('number');
      });

      // Add booking for resource
      cy.api({
        method: 'POST',
        url: `${Cypress.env('td_api_url')}/bookings`,
        headers: {
          'X-Api-Key': Cypress.env('td_api_key'),
        },
        body: {
          resource_id: resourceId,
          project_id: projectId,
          minutes: 480,
          weekend_booking: true,
          holidays_booking: true,
          vacations_booking: true,
          description: 'Commercial project',
          external_id: 'string',
          start_date: '2023-05-01',
          end_date: '2023-05-30',
          creator_resource_id: adminId,
          editor_resource_id: adminId,
        },
      }).then((response) => {
        expect(response.status).to.equal(201);
      });

      // Add time entry for resource
      cy.api({
        method: 'POST',
        url: `${Cypress.env('td_api_url')}/time-entries`,
        headers: {
          'X-Api-Key': Cypress.env('td_api_key'),
        },
        body: {
          resource_id: resourceId,
          project_id: projectId,
          minutes: 240,
          weekend_booking: true,
          holidays_booking: true,
          vacations_booking: true,
          description: 'Commercial project',
          external_id: 'string',
          start_date: '2023-05-01',
          end_date: '2023-05-01',
          creator_resource_id: adminId,
          editor_resource_id: adminId,
        },
      }).then((response) => {
        expect(response.status).to.equal(201);

        timeEntryId = response.body.id;
        expect(timeEntryId).to.be.a('number');
      });

      // Get time entries in organization
      cy.api({
        method: 'GET',
        url: `${Cypress.env('td_api_url')}/time-entries?sort=-id`,
        headers: {
          'X-Api-Key': Cypress.env('td_api_key'),
        },
      }).then((response) => {
        expect(response.status).to.equal(200);

        const entry = _.find(response.body, { id: timeEntryId });
        expect(entry.id).to.exist.and.equal(timeEntryId);
      });
    });
  });
});
