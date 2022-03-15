const { Sequelize, Contact } = require("../config/orm/models");
const { Op } = Sequelize;

class ContactService {
  checkOwner(owner, contact) {
    if (contact.userId !== owner) {
      throw new Error("Illegal access");
    }
  }

  search(userId, term) {
    const where = { userId };
    if (term !== undefined) {
      const searchCondition = { [Op.like]: `%${term}%` };
      where[Op.or] = [
        { firstName: searchCondition },
        { lastName: searchCondition },
        { company: searchCondition },
        { phone: searchCondition },
        Sequelize.where(
          Sequelize.fn(
            "concat",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          searchCondition
        ),
      ];
    }
    return Contact.findAll({ where });
  }

  async findById(userId, id) {
    const contact = await Contact.findByPk(id);
    this.checkOwner(userId, contact);
    return contact;
  }

  create(contact) {
    return Contact.create(contact);
  }

  update(contact) {
    return Contact.update(contact, { where: { id: contact.id } });
  }

  delete(contact) {
    return Contact.destroy({ where: { id: contact.id } });
  }
}

module.exports = ContactService;
