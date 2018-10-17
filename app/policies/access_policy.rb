class AccessPolicy
  include AccessGranted::Policy

  def configure
    # Example policy for AccessGranted.
    # For more details check the README at
    #
    # https://github.com/chaps-io/access-granted/blob/master/README.md
    #
    # Roles inherit from less important roles, so:
    # - :admin has permissions defined in :member, :guest and himself
    # - :member has permissions from :guest and himself
    # - :guest has only its own permissions since it's the first role.
    #
    # The most important role should be at the top.
    # In this case an administrator.
    #
    role :super, proc { |user| user.has_permission? :super } do
      can :manage, User
    end

    role :admin, proc { |user| user.has_permission? :admin } do
      can [:read,:update], User
      can :manage, ContactEmail
      can :manage, Address
      can :manage, Announcement
      can :manage, Contractee
      can :manage, Contract
      can :manage, Email
      can :manage, Event
      can :manage, HomePagePosting
      can :manage, HomePageLink
      can :manage, HomePageVideo
      can :manage, Mailer
      can :manage, Payment
      can :manage, Phone
      can :manage, Program
      can :manage, Requirement
      can :manage, Student
    end

    # More privileged role, applies to registered users.
    #
    # role :member, proc { |user| user.registered? } do
    #   can :create, Post
    #   can :create, Comment
    #   can [:update, :destroy], Post do |post, user|
    #     post.author == user
    #   end
    # end
    role :student, proc { |user| user.has_permission? :student } do
      can [:create], ContactEmail
      can :read, Announcement
      can :read, Event
    end

    # The base role with no additional conditions.
    # Applies to every user.
    #
    # role :guest do
    #  can :read, Post
    #  can :read, Comment
    # end
    role :user, proc { |user| user.has_permission? :user } do
      can :read, Event
    end

    role :guest, proc { |user| user.has_permission? :guest } do
      can :read, Event
    end

  end
end
