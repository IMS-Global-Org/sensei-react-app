# Takes a set of Student records set and produces a pdf file
module Pdfable
  extend ActiveSupport::Concern

  # Generator for the pdf file
  def self.generate_pdf(students)
    @students = students
    @pdf = Prawn::Document.new
    @pdf.text 'Student Listing in PDF'
    @pdf.render_file
  end

end
