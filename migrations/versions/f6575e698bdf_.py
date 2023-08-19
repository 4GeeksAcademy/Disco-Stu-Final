"""empty message

Revision ID: f6575e698bdf
Revises: fa541f07feaa
Create Date: 2023-08-18 03:39:11.334515

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f6575e698bdf'
down_revision = 'fa541f07feaa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('home_content', schema=None) as batch_op:
        batch_op.alter_column('descripcion',
               existing_type=sa.VARCHAR(length=2000),
               type_=sa.String(length=4000),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('home_content', schema=None) as batch_op:
        batch_op.alter_column('descripcion',
               existing_type=sa.String(length=4000),
               type_=sa.VARCHAR(length=2000),
               existing_nullable=True)

    # ### end Alembic commands ###
