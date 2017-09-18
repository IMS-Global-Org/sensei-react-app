module StudentTextTable
  extend ActiveSupport::Concern
  require 'text-table'

  def build_text_table(students)
    table = Text::Table.new
    table.head = [
      'First',
      'Last',
      'Birthday',
      'Age',
      'Day to B-Day',
      'Belt',
      'Level'
    ]
    students.each do |student|
      table.rows << [
        student.first,
        student.last,
        student.birthday,
        student.current_age,
        student.days_left,
        student.belt,
        student.level
      ]
    end
    table.to_s
  end
end
