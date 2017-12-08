module StudentCSV
  extend ActiveSupport::Concern
  require 'csv'

  included do
    # before_action :set_pdf_handle, only: [:pdf]
  end


  def render_csv(records)
    csv_file = 'students_spreedsheet.csv'
    data = CSV.generate(quote_char: '"') do |csv|
      csv << records.attribute_names
      records.all.each do |record|
        csv << record.attributes.values
      end
    end
    send_data data,
      filename: csv_file,
      type: 'text/csv; charset=utf-8; header=present',
      disposition: "attachment; filename=#{csv_file}"
  end
end
