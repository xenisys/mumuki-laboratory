module WithSlug
  extend ActiveSupport::Concern

  included do
    validates_presence_of :slug
    validates_uniqueness_of :slug
  end

  def import!
    import_from_json! Mumukit::Bridge::Bibliotheca.new.send(self.class.name.underscore, slug)
  end

  #TODO use mumukit slug
  def org_and_repo
    org, repo = slug.split('/')
    {organization: org, repository: repo}
  end

  module ClassMethods
    def import!(slug)
      transaction do
        item = find_or_initialize_by(slug: slug)
        item.save(validate: false)
        item.import!
      end
    end
  end
end