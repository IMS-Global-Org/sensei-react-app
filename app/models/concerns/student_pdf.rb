# Takes a set of Student records set and produces a pdf file
module StudentPdf
  extend ActiveSupport::Concern

  included do
    attr_reader :pdf
    before_action :set_pdf_handle, only: [:pdf]
  end


  def set_pdf_handle
    @pdf = Prawn::Document.new
  end

  def render_pdf(students)
    file_name = 'students_list.pdf'
    students.each do |student|
      fields = student.attributes.values
      line = fields.join(',')
      @pdf.text line
    end
    send_data @pdf.render,
      filename: file_name,
      type: 'application/pdf',
      disposition: "inline; filename=#{file_name}"
  end
end
