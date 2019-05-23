const Office = require('../models/offices');
const Agent = require('../models/agents');
const Propertie = require('../models/properties');

const config = require('../config.json');

module.exports = (Sequelize, config) =>
{
    const options = {
        host: config.host,
        dialect: config.dialect,
        logging: false,
        port: config.port,
    };

    const sequelize = new Sequelize(config.db, config.login, config.password, options);

    const offices = Office(Sequelize, sequelize);
    const agents = Agent(Sequelize, sequelize);
    const properties = Propertie(Sequelize, sequelize);

    properties.belongsTo(agents, { foreignKey: 'agentId' });
    agents.belongsTo(offices, { foreignKey: 'officeId' });
    offices.hasMany(agents);
    agents.hasMany(properties);
    console.log(1);

    return {
        offices,
        agents,
        properties,

        sequelize: sequelize,
        Sequelize: Sequelize
    };
};